import { useEffect } from 'react'

export const useInfiniteScroll = (callback: () => void, hasMore: boolean, loading: boolean) => {
  useEffect(() => {
    if (loading || !hasMore) return
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) callback()
    }, { threshold: 1.0 })
    const sentinel = document.querySelector('#sentinel')
    if (sentinel) observer.observe(sentinel)
    return () => observer.disconnect()
  }, [callback, hasMore, loading])
}
