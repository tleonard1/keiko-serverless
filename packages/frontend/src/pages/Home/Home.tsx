import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Draggable from 'react-draggable';

import { useState } from 'react';
import nft1 from 'assets/nft1.png';
import nft2 from 'assets/nft2.png';
import nft3 from 'assets/nft3.png';
import nft4 from 'assets/nft4.png';
import nft5 from 'assets/nft5.png';
import axios from 'axios';

import { ApeNFT, BackgroundPaper } from './Home.style';
import { useAudio } from 'hooks';

import coin from '../../assets/coin.mp3';
import kumo from 'assets/kumo.svg';
import { useAsync } from 'react-use';

const client = axios.create({
  baseURL: process.env.VITE_API_URL,
});

interface ApeNFTProps {
  id: string;
  positionX: number;
  positionY: number;
  src: string;
}

interface ApeNFTData {
  id: string;
  positionX: number;
  positionY: number;
  imageIndex: number;
}

const ApeNFTImgs = [nft1, nft2, nft3, nft4, nft5];


const generateUserId = () => crypto.randomUUID();

const Home = (): JSX.Element => {
  const [score, setScore] = useState(0);

  const [apeNFTs, setApeNFTs] = useState<ApeNFTProps[]>([]);

  const [userId, setUserId] = useState(generateUserId());
  //const userId = '5fa786c3-956c-4b9e-bcb3-76473a1fb718';
  
  useAsync(async () => {
    const { data } = await client.get<ApeNFTData[]>(`/nfts/${userId}`);
    setApeNFTs(
      data.map(apeNFT => ({
        ...apeNFT,
        src: ApeNFTImgs[apeNFT.imageIndex],
      })),
    );
  });


  const getBalance = async (userId: string) => {
    const response = await client.get<number>(`/getbalance/${userId}`);
    return response.data;
  }

  const buyApeNFT = async () => {
    const { data } = await client.post<ApeNFTData>(`/nfts/${userId}`);

    setApeNFTs(prevApeNFTs =>
      prevApeNFTs.concat({ ...data, src: ApeNFTImgs[data.imageIndex] }),
    );

    getBalance(userId).then(balance => setScore(balance));
  };

  const sellApeNFT = async (apeNFTId: string) => {
    await client.delete(`/nfts/${apeNFTId}`);
    setApeNFTs(prevApeNFTs => prevApeNFTs.filter(({ id }) => id !== apeNFTId));
    
    getBalance(userId).then(balance => setScore(balance));
  };
  const audio = useAudio(coin, { volume: 0.8, playbackRate: 1 });


  return (
    <Box display="flex" flexDirection="column" height="100vh" maxWidth="100%">
      <AppBar position="sticky">
        <Toolbar style={{ backgroundColor: '#181173' }}>
          <Button>
            <a href="https://dev.to/kumo">
              <img
                src={kumo}
                width="auto"
                height="50px"
                style={{ marginTop: '15px' }}
              />
            </a>
          </Button>
          <Typography variant="h1" sx={{ flexGrow: 1 }}>
            {'Learn Serverless with Bored Apes'}
          </Typography>
          <Typography
            variant="h1"
            color={score > 0 ? 'green' : 'red'}
            style={{
              padding: '10px',
              backgroundColor: '#f2b056',
              marginTop: '5px',
              marginBottom: '5px',
            }}
            border={score > 0 ? '4mm solid green' : '4mm solid red'}
          >
            {`Score: ${score.toString().padStart(10, ' ')} $`}
          </Typography>
        </Toolbar>
      </AppBar>
      <BackgroundPaper>
        <Box
          display="flex"
          flexDirection="row"
          height="100vh"
          paddingLeft="10%"
          paddingRight="10%"
          justifyContent="space-between"
          maxWidth="100%"
        >
          <Box>
            {apeNFTs.map(apeNFT => (
              <Draggable>
                <ApeNFT
                  height="100px"
                  key={apeNFT.id}
                  {...apeNFT}
                  onDoubleClick={() => {
                    sellApeNFT(apeNFT.id);
                    audio.play();
                  }}
                ></ApeNFT>
              </Draggable>
            ))}
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignContent="center"
            textAlign="center"
            style={{
              position: 'absolute',
              top: '35%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Button onClick={buyApeNFT}>
              <Typography color="lightblue" fontSize={50}>
                {'Buy ApeNFT'}
              </Typography>
            </Button>
          </Box>
        </Box>
      </BackgroundPaper>
    </Box>
  );
};

export default Home;
