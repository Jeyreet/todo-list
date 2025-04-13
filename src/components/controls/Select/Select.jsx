import classes from './Select.module.css'
import {Button} from "../Button/Button.jsx";
import inputClasses from '../Input.module.css'
import buttonClasses from '../Button/Button.module.css'
import {Children, useEffect, useRef, useState} from "react";
import {Controls} from "../DateInput/Calendar/Controls/Controls.jsx";
import {Days} from "../DateInput/Calendar/Days/Days.jsx";
import {Portal} from "../../Portal.jsx";
import clsx from "clsx";
import {useController} from "react-hook-form";
import ChevronDownIcon from '../../../assets/icons/chevron_down.svg'
import {useEscape} from "../../../hooks/useEscape.js";

export const Select = ({inline = false, label, name = '', control, rules, children}) => {
  const {
    field: {onChange, onBlur, value},
    fieldState: { error }
  } = useController({
    name,
    control,
    rules,
  })

  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const innerRef = useRef(null)
  const selectGroupRef = useRef(null)

  const updatePosition = () => {
    if (!selectGroupRef.current || !innerRef.current) return

    const selectGroupRect = selectGroupRef.current.getBoundingClientRect()
    const calendarRect = innerRef.current.getBoundingClientRect()

    innerRef.current.style.left = `${selectGroupRect.left}px`
    innerRef.current.style.width = `${selectGroupRect.width}px`

    if (window.innerHeight - selectGroupRect.bottom > calendarRect.height)
      innerRef.current.style.top = `${selectGroupRect.bottom}px`
    else
      innerRef.current.style.top = `${selectGroupRect.top - calendarRect.height}px`
  }

  useEffect(() => {
    updatePosition()
  }, [isOpen])

  useEffect(() => {
    updatePosition()
    window.addEventListener('resize', updatePosition)
    return () => window.removeEventListener('resize', updatePosition)
  }, [])

  useEscape(() => setIsOpen(false), isOpen)

  return (
    <label className={clsx(inputClasses.Input, classes.Select, inline && classes.inline)}>
      <div className={inputClasses.name}>
        <span>
          {label}
        </span>
        <span>
          {!inline && error?.message && ` (${error.message})`}
        </span>
      </div>
      <div className={classes.selectGroup} ref={selectGroupRef}>
        <div className={clsx(inputClasses.input, classes.selected)}>
          {children[selectedIndex].props.children}
        </div>
        <Button onClick={() => setIsOpen(true)}>
          <ChevronDownIcon className={clsx('icon', 'icon--button', classes.icon, isOpen && classes.rotated)} />
        </Button>
      </div>
      <select
        className="visually-hidden"
        inert
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      >
        {
          Children.map(children, (child, index) => (
            <option
              key={index}
              value={child.props.value}
            >
              {child.props.children}
            </option>
          ))
        }
      </select>
      <Portal>
        <div className={classes.selector} inert={!isOpen} onClick={() => setIsOpen(false)}>
          <div className={classes.inner} ref={innerRef} onClick={e => e.stopPropagation()}>
            <div className={classes.hider}>
              <div className={classes.padding}>
                <ul>
                  {
                    Children.map(children, (child, index) => (
                      <li key={index}>
                        <Button
                          className={buttonClasses.option}
                          onClick={() => {
                            setIsOpen(false)
                            onChange(child.props.value)
                            setSelectedIndex(index)

                            if (child.props.onSelect)
                              child.props.onSelect()
                          }}
                        >
                          {child.props.children}
                        </Button>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Portal>
    </label>
  )
}