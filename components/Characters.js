import react from 'react';
import Image from 'next/image';
import { Heading, Text, SimpleGrid } from '@chakra-ui/layout';

const Characters = ({ char }) => {
  return (
    <div>
      <Image src={char.image} width={300} height={300} />
      <Heading as="h4" align="center" size="md">
        {char.name}
      </Heading>
      <Text align="center">Origin: {char.origin.name}</Text>
      <Text align="center">Location: {char.location.name}</Text>
    </div>
  );
};
export default Characters;
