export default function isIOSPlatform() {
  const devices = ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod']

  for (const device of devices) {
    if (navigator.userAgent.includes(device)) return true
  }

  return false
}
