export interface NodeInterface {
  props: {
    suffixIcon: string
    type: string
  }
}

const useInputPassword = () => {

  const handleToggleIconPass = (node: NodeInterface) => {
    node.props.suffixIcon = node.props.suffixIcon === 'eye' ? 'eyeClosed' : 'eye'
    node.props.type = node.props.type === 'password' ? 'text' : 'password'
  }
  
  return {
    handleToggleIconPass
  }
}

export default useInputPassword
