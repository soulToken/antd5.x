/*
 * @Description:
 * @Version: 1.0.0
 * @Autor: haowenbin
 * @Date: 2022-11-15 10:51:01
 * @LastEditors: haowenbin
 * @LastEditTime: 2022-11-16 15:59:51
 * @FilePath: \testproject\src\components\icon\index.tsx
 */
import "./index.less";
const requireAll = (requireContext: any )=> requireContext.keys().map(requireContext)
const req = (require as any).context('@/assets/icons', true, /\.svg$/);
console.log(req);
requireAll(req);
type Props = {
  name: string,
  iconClass: string,
  onClick?: () => void,
}

function Icon(props: Props) {
  return (
    <svg onClick={ props.onClick } className={ `icon' ${props.iconClass}`}>
      <use  xlinkHref={'#' + props.name} />
    </svg>
  )
}
export default Icon