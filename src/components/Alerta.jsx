
const Alerta = ( {alerta} ) => {
  //--------VIEW--------//
  return (
    <div className={`${alerta.error ? 'from-red-400 to-red-600' : 'from-indigo-400 to-indigo-600'}
        bg-gradient-to-br text-center p-3 mb-10 rounded-xl uppercase text-white font-bold text-sm`}>
        {alerta.msg}
    </div>
  )
}

export default Alerta