import { Box, Typography, Button } from '@mui/material'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { changeStatusClick, decrement, increment } from '../store/productSlice';

type Props = {
  name: string,
  image: {
    thumbnail: string,
    mobile: string,
    tablet: string,
    desktop: string
  },
  category: string,
  price: number,
  index: number,
  isClicked: boolean,
  quantity: number
};

const ProductCard = ({ name, image, category, price, index, isClicked, quantity }: Props) => {

  const dispatch = useDispatch<AppDispatch>()

  const handleClick = () => {
    dispatch(changeStatusClick(index))

  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'start', flexDirection: 'column',}}>
      <Box component="picture" sx={{width: '100%',maxWidth: 400,position: 'relative',mb: 2,}}>
        <source media="(min-width: 1024px)" srcSet={image.desktop} />
        <source media="(min-width: 768px)" srcSet={image.tablet} />
        <source media="(min-width: 480px)" srcSet={image.mobile} />
        <Box
          component="img"
          src={image.mobile}
          alt={name}
          sx={{
            width: '100%',
            height: 'auto',
            borderRadius: '10px',
            objectFit: 'cover',
            display: 'block',
          }}
        />

        <Button
          variant="contained"
          sx={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: 14,
            width: '70%',
            backgroundColor: isClicked ? 'hsl(14, 86%, 42%)' : 'white',
            color: 'black',
            borderRadius: 5,
            height: 50,
            textTransform: 'none',
            p: 2,
          }}
          onClick={handleClick}
        >
          {isClicked ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 2,
                width: '100%',
              }}
            >
              <Box
                sx={{
                  border: '1px solid hsl(13, 31%, 94%)',
                  borderRadius: '50%',
                  width: 20,
                  height: 20,
                  minWidth: 0,
                  backgroundColor: 'hsl(13, 70%, 55%)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(decrement(index));
                }}
              >
                <Box component={'img'} sx={{ height: 12, width: 12 }} src="icon-decrement-quantity.svg" />
              </Box>

              <Typography sx={{ color: 'white', fontWeight: 'bold' }}>{quantity}</Typography>
              <Box
                sx={{
                  border: '1px solid hsl(13, 31%, 94%)',
                  borderRadius: '50%',
                  width: 20,
                  height: 20,
                  minWidth: 0,
                  backgroundColor: 'hsl(13, 70%, 55%)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(increment(index));
                }}
              >
                <Box component={'img'} sx={{ height: 12, width: 12 }} src="icon-increment-quantity.svg" />
              </Box>
            </Box>
          ) : (
            <>
              <Box component={'img'} src="icon-add-to-cart.svg" sx={{ marginRight: 1 }} />
              Add to cart
            </>
          )}
        </Button>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Typography color="hsl(7, 20%, 60%)" variant="body2">{category}</Typography>
        <Typography fontSize={17} fontWeight="bold" variant="body1">{name}</Typography>
        <Typography fontSize={17} color="hsl(14, 86%, 42%)" variant="body2">
          ${price.toFixed(2)}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProductCard;
