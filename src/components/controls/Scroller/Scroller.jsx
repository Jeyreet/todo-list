import clsx from 'clsx'
import { memo, useCallback, useEffect, useRef, useState } from 'react'

import c from './Scroller.module.scss'

export const Scroller = memo(
  ({ innerTag: InnerTag = 'div', children, className, cs = {} }) => {
    const trackRef = useRef(null)
    const thumbRef = useRef(null)
    const scrollerRef = useRef(null)
    const innerRef = useRef(null)

    const initialClickElement = useRef(null)

    const [isScrollable, setIsScrollable] = useState(false)
    const [isScrolling, setIsScrolling] = useState(false)

    const getHeights = useCallback(() => {
      return {
        track: parseFloat(window.getComputedStyle(trackRef.current).height),
        thumb: parseFloat(window.getComputedStyle(thumbRef.current).height),
        scroller: parseFloat(
          window.getComputedStyle(scrollerRef.current).height
        ),
        inner: parseFloat(window.getComputedStyle(innerRef.current).height)
      }
    }, [])

    const updateThumbTop = useCallback(() => {
      const heights = getHeights()
      const moveHeight = heights.track - heights.thumb
      const scrollHeight = heights.inner - heights.scroller
      const scrollPercent = scrollerRef.current.scrollTop / scrollHeight

      thumbRef.current.style.transform = `translateY(${moveHeight * scrollPercent}px)`
    }, [getHeights])

    const updateThumbHeight = useCallback(() => {
      const heights = getHeights()

      if (heights.scroller >= heights.inner) setIsScrollable(false)
      else setIsScrollable(true)

      const thumbHeight = (heights.scroller / heights.inner) * heights.track
      thumbRef.current.style.height = `${thumbHeight > 10 ? thumbHeight : 10}px`

      updateThumbTop()
    }, [getHeights, updateThumbTop])

    useEffect(() => {
      const observer = new ResizeObserver(updateThumbHeight)

      observer.observe(scrollerRef.current)
      observer.observe(innerRef.current)
      observer.observe(trackRef.current)

      return () => observer.disconnect()
    }, [updateThumbHeight])

    const handleThumbDragStart = e => {
      const isTouch = e.type === 'touchstart'
      const mouseDownY = isTouch ? e.touches[0].clientY : e.clientY
      const thumbTop = thumbRef.current.getBoundingClientRect().top
      const trackTop = trackRef.current.getBoundingClientRect().top
      const offset = thumbTop - trackTop
      const heights = getHeights()
      const moveHeight = heights.track - heights.thumb
      const scrollHeight = heights.inner - heights.scroller

      const handleThumbDrag = e => {
        const mouseMoveY = isTouch ? e.touches[0].clientY : e.clientY
        const moveDistance = mouseMoveY - mouseDownY
        const thumbTop = moveDistance + offset

        if (thumbTop < 0) scrollerRef.current.scrollTop = 0
        else if (thumbTop > moveHeight)
          scrollerRef.current.scrollTop = scrollHeight
        else
          scrollerRef.current.scrollTop = scrollHeight * (thumbTop / moveHeight)

        updateThumbTop()
      }

      const handleThumbDragEnd = () => {
        setIsScrolling(false)

        if (isTouch) {
          document.removeEventListener('touchmove', handleThumbDrag)
          document.removeEventListener('touchend', handleThumbDragEnd)
        } else {
          document.removeEventListener('mousemove', handleThumbDrag)
          document.removeEventListener('mouseup', handleThumbDragEnd)
        }
      }

      setIsScrolling(true)

      if (isTouch) {
        document.addEventListener('touchmove', handleThumbDrag)
        document.addEventListener('touchend', handleThumbDragEnd)
      } else {
        document.addEventListener('mousemove', handleThumbDrag)
        document.addEventListener('mouseup', handleThumbDragEnd)
      }
    }

    const handleTrackMouseDown = e => {
      initialClickElement.current = e.target
    }

    const handleTrackClick = e => {
      if (initialClickElement.current === thumbRef.current) return

      const trackRect = trackRef.current.getBoundingClientRect()
      const thumbHeight = thumbRef.current.offsetHeight
      const clickY = e.clientY - trackRect.top - thumbHeight / 2
      const heights = getHeights()
      const scrollHeight = heights.inner - heights.scroller
      const moveHeight = heights.track - heights.thumb
      const scrollTop = (clickY / moveHeight) * scrollHeight

      scrollerRef.current.scrollTo({
        top: scrollTop,
        behavior: 'smooth'
      })
    }

    return (
      <div className={clsx(c.Scroller, className)}>
        <div
          className={clsx(c.scroller, cs.scroller)}
          ref={scrollerRef}
          onScroll={updateThumbTop}
        >
          <InnerTag className={cs.inner} ref={innerRef}>
            {children}
          </InnerTag>
        </div>
        <div
          className={clsx(
            c.trackPadding,
            isScrollable && c.scrollable,
            isScrolling && c.scrolling
          )}
          onMouseDown={handleTrackMouseDown}
          onClick={handleTrackClick}
        >
          <div className={clsx(c.track, cs.track)} ref={trackRef}>
            <div
              className={clsx(c.thumb, cs.thumb)}
              ref={thumbRef}
              onMouseDown={handleThumbDragStart}
              onTouchStart={handleThumbDragStart}
            />
          </div>
        </div>
      </div>
    )
  }
)
