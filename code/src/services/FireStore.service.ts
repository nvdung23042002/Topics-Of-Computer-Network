import Config from '@/config'
import { FIREBASE } from '@/constants/firebase'
import { initializeApp } from 'firebase/app'
import { Firestore, collection, doc, getFirestore, onSnapshot, query, where } from 'firebase/firestore'

const env = Config.MODE

export class FireStoreService {
  private static _instance: FireStoreService
  static db: Firestore
  constructor() {
    const app = initializeApp({
      apiKey: Config.FIREBASE_CONFIG_API_KEY,
      authDomain: Config.FIREBASE_CONFIG_AUTH_DOMAIN,
      projectId: Config.FIREBASE_CONFIG_PROJECT_ID
    })
    FireStoreService.db = getFirestore(app)
  }
  static getInstance() {
    if (this._instance) {
      return this._instance
    }
    return (this._instance = new FireStoreService())
  }

  listenTimeOutOddsFighter(
    collectionName: string,
    id: string,
    callback: (data: any) => void,
    error?: (error: any) => void
  ): any {
    return onSnapshot(doc(FireStoreService.db, env, FIREBASE.BET_SETTING, collectionName, `ID_${id}`), callback, error)
  }

  listentimeOutTicketsBetedFighterOfTournament(
    tournamentId: string,
    callback: (data: any) => void,
    error?: (error: any) => void
  ): any {
    return onSnapshot(
      doc(FireStoreService.db, env, FIREBASE.BET_SETTING, FIREBASE.TOURNAMENT_ID, `ID_${tournamentId}`),
      callback,
      error
    )
  }

  listentimeOutTicketsBetedFighterOfMatch(
    commonId: string,
    callback: (data: any) => void,
    error?: (error: any) => void
  ): any {
    return onSnapshot(
      doc(FireStoreService.db, env, FIREBASE.T_BET_USER, FIREBASE.TOTAL_TICKET_BET_SETTING_ID, `ID_${commonId}`),
      callback,
      error
    )
  }

  listentimeOutTicketsBetedFighterOfNormalMatch(
    matchId: string,
    callback: (data: any) => void,
    error?: (error: any) => void
  ): any {
    return onSnapshot(
      doc(FireStoreService.db, env, FIREBASE.T_BET_USER, FIREBASE.TOTAL_TICKET_MATCH_NORMAL_ID, `ID_${matchId}`),
      callback,
      error
    )
  }

  listentimeOutSponsor(
    collectionName: string,
    optionBetId: string,
    callback: (data: any) => void,
    error?: (error: any) => void
  ): any {
    return onSnapshot(
      doc(FireStoreService.db, env, FIREBASE.SPONSOR, collectionName, `ID_${optionBetId}`),
      callback,
      error
    )
  }

  listenTicketBalance(id: string, callback: (data: any) => void, error?: (error: any) => void): any {
    return onSnapshot(
      query(
        collection(FireStoreService.db, env, FIREBASE.USER, FIREBASE.TOTAL_TICKET_AND_BALANCE_USER),
        where('userId', '==', id.toString())
      ),
      callback,
      error
    )
  }
}

export default FireStoreService.getInstance()
