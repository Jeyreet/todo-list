import Spinner from '../../../assets/icons/spinner.svg'
import c from './Loader.module.scss'

export const Loader = () => {
  return (
    <div className={c.Loader}>
      <Spinner className={c.icon} />
    </div>
  )
}
