
import { IKImage } from 'imagekitio-react';
const Image = ({path,src,alt,className,w,h}) => {
  return (
    <IKImage urlEndpoint={import.meta.env.VITE_URL_IK_ENDPOINT}
    path={path}
    src={src}
    transformation={[{
      
      width: w,
      height:h
    }]}
    className={className}
    alt={alt}
    loading='lazy'
    lqip={{active: true,quality:20}}
    />
  )
}

export default Image