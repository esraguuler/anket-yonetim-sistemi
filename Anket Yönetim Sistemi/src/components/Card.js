const Card = ({children, className}) => {
  return (
    <div className={`card shadow-sm p-3 rounded ${className}`}>
        {children}
    </div>
  )
}

export default Card