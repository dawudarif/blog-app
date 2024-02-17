import { ring2 } from 'ldrs';

ring2.register();

interface RingLoaderProps {
  size: number;
  stroke?: number;
  color?: string;
}

const RingLoader: React.FC<RingLoaderProps> = ({ size, stroke, color }) => {
  return (
    <l-ring-2
      size={size}
      stroke={stroke ? stroke : '5'}
      stroke-length='0.15'
      bg-opacity='0.1'
      speed='1.3'
      color={color ? color : 'black'}
    ></l-ring-2>
  );
};
export default RingLoader;
