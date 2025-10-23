//exemplo de hook persona
const useModal = function () {
  // Apenas um teste para dar um exemplificar o uso do hook
  const testHook = function () {
    console.log('Esse é o hook personalizado da modal!')
  }

  return { testHook }
}

export { useModal }
