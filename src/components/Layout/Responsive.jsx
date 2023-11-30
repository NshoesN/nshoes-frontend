import {useMediaQuery} from 'react-responsive';

export const Mobile = ({children}) => {
  const isMobile = useMediaQuery({
    query : "(max-width:800px)"
  });
  
  return <>{isMobile && children}</>
}

export const PC = ({children}) => {
  const isPc = useMediaQuery({
    query : "(min-width:801px)"
  });
  
  return <>{isPc && children}</>
}