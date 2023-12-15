import React, { RefObject, forwardRef, memo, useCallback, useEffect, useImperativeHandle, useRef } from 'react'
import Web3RPC from '@/utils/web3'
import { CHAIN_NAMESPACES, WALLET_ADAPTERS, ADAPTER_EVENTS } from '@web3auth/base'
import { Web3AuthNoModal } from '@web3auth/no-modal'
import { OpenloginAdapter } from '@web3auth/openlogin-adapter'
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { logout, offLoading, onLoading, setWeb3Auth, syncBalanceTicket, syncETHBalance } from '@/redux/auth/slice'
import Storage from '@/utils/storage'
import { isEmpty, isNil } from 'lodash'
import Config from '@/config'
import Modal, { ModalHandle } from './modal'
import FireStore from '@/services/FireStore.service'
import { useRouter } from 'next/router'
import { AppRoutes } from '@/constants/routes'
import Logo from '@/assets/svg/logo.svg'
import { STORAGE_KEY } from '@/constants/common'
import { loginThunk } from '@/redux/auth/thunk'
import showMessage from '@/utils/showMessage'

export type LoginType = 'google' | 'facebook' | 'twitter' | 'discord' | 'email_passwordless'
export const logoutCodeException = ['ERRORS_AUTH_USER_04']
export type Web3AuthParams = {
  loginProvider: LoginType
  extraLoginOptions?: {
    login_hint: string
  }
}
export type Web3ContainerProps = {
  onCompleted?: () => void
}
export type Web3ContainerHandle = {
  login: () => void
  logout: () => void
}

const initWeb3Auth = async (clientId: string, appUrl: string, lang: 'ja' | 'en') => {
  const web3auth = new Web3AuthNoModal({
    clientId,
    chainConfig: {
      chainNamespace: CHAIN_NAMESPACES.EIP155
    },
    sessionTime: 86400 * (Config.WEB3AUTH_SESSION_DAY ?? 1),
    web3AuthNetwork: Config.WEB3AUTH_NETWORK
  })

  const openloginAdapter = new OpenloginAdapter({
    privateKeyProvider: new EthereumPrivateKeyProvider({
      config: {
        chainConfig: {
          chainId: Config.CHAIN_ID,
          rpcTarget: Config.RPC_END_POINT,
          displayName: Config.NETWORK_NAME,
          blockExplorer: Config.BLOCK_EXPLORER,
          ticker: 'ETH',
          tickerName: 'Ethereum'
        }
      }
    }),
    adapterSettings: {
      uxMode: 'redirect',
      redirectUrl: `${appUrl}/auth-redirect`,
      whiteLabel: {
        name: 'ebetinfo',
        url: appUrl,
        logoLight: `${appUrl}${Logo.src}`,
        logoDark: `${appUrl}${Logo.src}`,
        defaultLanguage: lang,
        dark: false, // whether to enable dark mode. defaultValue: false
        theme: {
          primary: '#DE1D43'
        }
      }
    }
  })
  web3auth.configureAdapter(openloginAdapter)

  await web3auth.init()

  return web3auth
}

const Web3AuthContainer = forwardRef<any, Web3ContainerProps>((props, forwardRef) => {
  const modalRef: RefObject<ModalHandle> | undefined = useRef<ModalHandle>(null)
  const ticketListenRef = useRef<any>(null)
  const broadCast = useRef<any>(null)
  const zone = useAppSelector((state) => state.app.zone)
  const auth = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  const router = useRouter()
  const handleSetLoginHistory = async (profile: any, auth: any) => {
    const data = {
      email: profile?.email ?? null,
      fullName: profile?.name ?? null,
      phone: profile?.phone ?? null,
      profileImage: profile?.profileImage ?? null,
      publicKey: profile?.publicAddress ?? null,
      tokenId: profile?.idToken ?? null,
      typeLogin: profile?.typeOfLogin ?? null
    }

    const { meta, payload, error }: any = await dispatch(loginThunk({ data, profile }))

    if (meta.requestStatus === 'rejected') {
      const code: string = error?.code
      const isBlock = ['ERRORS_AUTH_USER_04', 'ERRORS_AUTH_USER_06'].includes(code)

      // modalRef.current?.hidden()

      if (isBlock) {
        showMessage({ error: code }, () => onLogoutWeb3Auth(auth), 'error-message')
      } else onLogoutWeb3Auth(auth)
    } else {
      if (payload?.isNewAccount === true) {
        Storage('session').remove(STORAGE_KEY.CURRENT_PATH)
        router.replace(AppRoutes.enterCodeAffiliate)
      } else {
        props.onCompleted && props.onCompleted()
      }
      broadCast.current?.postMessage('SIGNED_IN')
    }
  }

  const onAuthentication = async (auth: any, params?: Web3AuthParams) => {
    if (!auth) {
      console.log('Web3Auth have not initialized yet')
      return {}
    }

    if (!auth.connected) {
      if (isNil(params)) return {}

      Storage('session').set(STORAGE_KEY.CURRENT_PATH, {
        asPath: router.asPath,
        locale: router.locale,
        query: router.query,
        pathname: router.pathname
      })

      if (auth.status === ADAPTER_EVENTS.CONNECTING) {
        /** Re-initial */
        await auth.init()
      }
      const provider = await auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, params)
      Web3RPC.setProvider(provider)
    } else {
      Web3RPC.setProvider(auth.provider)
    }

    const { idToken } = await auth.authenticateUser()
    const profile = await auth.getUserInfo()

    const publicAddress = await Web3RPC.getAccounts()
    const privateKey = await Web3RPC.getPrivateKey()
    const balance = await Web3RPC.getBalance()
    return { idToken, ...profile, balance, publicAddress, privateKey }
  }

  const onInitLogin = useCallback(
    () => {
      if (!auth.web3Auth) {
        console.log('Web3Auth have not initialized yet')
        return
      }
      modalRef.current?.visible()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [auth?.web3Auth]
  )

  const onLoginWeb3Auth = useCallback(
    async (auth?: any, params?: Web3AuthParams) => {
      if (!auth) {
        console.log('Web3Auth have not initialized yet')
        return
      }

      try {
        dispatch(onLoading())

        const { idToken, ...userInfo } = await onAuthentication(auth, params)

        if (!isEmpty(userInfo)) {
          await handleSetLoginHistory({ idToken, ...userInfo }, auth)
        } else {
          dispatch(logout())
          props.onCompleted && props.onCompleted()
        }
      } catch (error) {
        console.log('error :>> ', error)
        props.onCompleted && props.onCompleted()
      } finally {
        dispatch(offLoading())
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const onLogoutWeb3Auth = useCallback(
    async (auth: any, singleEffect?: boolean) => {
      if (!auth) {
        console.log('web3auth not initialized yet')
        return
      }

      try {
        dispatch(onLoading())
        await Web3RPC.disconnectMetamask()

        const web3authProvider = await auth.logout()
        Web3RPC.setProvider(web3authProvider)

        dispatch(logout())
        if (!singleEffect) {
          broadCast.current?.postMessage('SIGNED_OUT')
        }

        if (props.onCompleted) {
          props.onCompleted()
        } else window.location.reload()
      } catch (error) {
        console.log('error :>> ', error)
      } finally {
        dispatch(offLoading())
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
  const getAppURL = (zone) => {
    switch (`${zone}_${process.env.NODE_ENV}`) {
      case 'global_production':
        return Config.APP_URL_GLOBAL
      case 'global_development':
        return 'http://localhost:8084'
      case 'jp_production':
        return Config.APP_URL
      default:
        return 'http://localhost:8080'
    }
  }
  useEffect(
    () => {
      ;(async () => {
        if (!auth?.web3Auth) {
          const web3Auth = await initWeb3Auth(
            zone === 'global' ? Config.WEB3AUTH_GLOBAL_CLIENT_ID : Config.WEB3AUTH_CLIENT_ID,
            getAppURL(zone),
            zone === 'global' ? 'en' : 'ja'
          )
          dispatch(setWeb3Auth({ web3Auth }))
        } else if (!isNil(auth?.user?.balance)) {
          // Sync balance
          const balance = await Web3RPC.getBalance()
          dispatch(syncETHBalance(balance))
        } else if (isNil(auth.user)) {
          onLoginWeb3Auth(auth.web3Auth)
        }
      })()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [auth?.web3Auth]
  )
  /**Sync ticket and balance */
  useEffect(() => {
    if (auth?.user?.userId && auth.isAuthenticated) {
      ticketListenRef.current = FireStore.listenTicketBalance(auth.user.userId, (snapshot) => {
        const data = snapshot.docs?.[0]?.data()
        if (data) {
          dispatch(
            syncBalanceTicket({
              totalTicket: data.totalTicket,
              accountBalance: data.accountBalance
            })
          )
        } else {
          dispatch(syncBalanceTicket({}))
        }
      })
    } else if (ticketListenRef.current) {
      ticketListenRef.current()
    }

    return () => {
      ticketListenRef.current && ticketListenRef.current()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.user?.userId, auth?.isAuthenticated])

  useEffect(() => {
    if (window?.BroadcastChannel) {
      broadCast.current = new BroadcastChannel('logoutChannel')
      broadCast.current.onmessage = async (event) => {
        if (event.data === 'SIGNED_OUT') {
          return window.location.reload()
        }
        if (event.data === 'SIGNED_IN') {
          const web3Auth = await initWeb3Auth(
            zone === 'global' ? Config.WEB3AUTH_GLOBAL_CLIENT_ID : Config.WEB3AUTH_CLIENT_ID,
            getAppURL(zone),
            zone === 'global' ? 'en' : 'ja'
          )
          dispatch(setWeb3Auth({ web3Auth }))
        }
      }

      return () => {
        broadCast.current.close()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useImperativeHandle(
    forwardRef,
    () => ({
      logout() {
        return onLogoutWeb3Auth(auth.web3Auth)
      },
      login() {
        return onInitLogin()
      }
    }),
    [onLogoutWeb3Auth, auth?.web3Auth, onInitLogin]
  )

  return <Modal ref={modalRef} onLogin={(params) => onLoginWeb3Auth(auth.web3Auth, params)} web3auth={auth?.web3Auth} />
})
export default memo(Web3AuthContainer)
