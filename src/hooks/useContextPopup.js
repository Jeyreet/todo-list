import { usePopup } from './usePopup'

export const useContextPopup = point => {
  const controls = usePopup()
  controls.point = point

  return controls
}
