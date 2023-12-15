export default function getYouTubeVideoId(url: string) {
  const decodeUrl = new URL(url)

  const videoId = decodeUrl.searchParams.get('v')
  const pathname = decodeUrl.pathname

  if (videoId && pathname === '/watch') return videoId

  // Regular expressions to match different YouTube URL formats
  const regExp =
    /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/live\/)([a-zA-Z0-9_-]+)$/

  const match = regExp.exec(`${decodeUrl.origin}${decodeUrl.pathname}`)
  if (match && match[1]) {
    return match[1]
  } else {
    return null // Invalid YouTube URL
  }
}
