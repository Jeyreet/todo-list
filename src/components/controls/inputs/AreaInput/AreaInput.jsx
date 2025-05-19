import { memo, useCallback, useEffect, useRef } from 'react'
import { useController } from 'react-hook-form'

import { mergeRefs } from '../../../../utils/mergeRefs'
import { Scroller } from '../../Scroller'
import { Header } from '../Header'
import c from './AreaInput.module.scss'

export const AreaInput = memo(
  ({ label, placeholder, name, rules, control, autoFocus }) => {
    const {
      field: { onChange, onBlur, value, ref },
      fieldState: { error }
    } = useController({ name, rules, control })

    const textareaRef = useRef(null)
    const prevWidthRef = useRef(null)

    const handleResize = useCallback(() => {
      const textarea = textareaRef.current

      const selectionStart = textarea.selectionStart
      const selectionEnd = textarea.selectionEnd

      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`

      textarea.setSelectionRange(selectionStart, selectionEnd)
    }, [])

    useEffect(() => {
      const resizeObserver = new ResizeObserver(() => {
        const newWidth = textareaRef.current.getBoundingClientRect().width
        if (prevWidthRef.current === newWidth) return

        prevWidthRef.current = newWidth

        handleResize()
      })
      resizeObserver.observe(textareaRef.current)

      return () => resizeObserver.disconnect()
    }, [handleResize])

    useEffect(handleResize, [value])

    return (
      <label>
        <Header label={label} error={error} />
        <Scroller className={c.scroller} cs={{ scroller: c.scrollerScroller }}>
          <textarea
            className={c.textarea}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            ref={mergeRefs(textareaRef, ref)}
            placeholder={placeholder}
            autoFocus={autoFocus}
            onInput={handleResize}
          />
        </Scroller>
      </label>
    )
  }
)
