import PropsTypes from 'prop-types'
const Button = ({color,text,onClick}) => {
  return (
    <button  style={{backgroundColor:color}}  onClick ={onClick} className='btn'>{text}</button>
  )
}


Button.propsTypes={
    color:PropsTypes.string,
    text:PropsTypes.string
}

Button.defaultProps={
    text:'Hello',
    color:'steelblue'

}

export default Button
