import { Box, Container, Grid, Typography, Button } from '@mui/material'
import ProductCard from './components/ProductCard'
import { useSelector } from 'react-redux'
import { RootState } from './store/store'
import { orderTotal, remove, selectTotalCartAdded } from './store/productSlice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from './store/store'
import ModalConfirm from './components/ModalConfirm'
import { useState } from 'react'

const App = () => {

  const dispatch = useDispatch<AppDispatch>()
  const productos = useSelector((state: RootState) => state.products.products)
  const total = useSelector(selectTotalCartAdded)
  const totalPagar = useSelector(orderTotal)
  const [open, setOpen] = useState(false);

  const productosAgregados = productos.filter(p => p.isClicked)

  return (
    <Container disableGutters sx={{ backgroundColor: 'hsl(13, 31%, 94%)', minHeight: '100vh', width: '100%',px:5,py:6 }} maxWidth={false}>
      <Box sx={{ width:'100%' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 5,
            alignItems: 'flex-start',
          }}
        >
          <Box sx={{ width: { xs: '100%', md: '70%' }, maxWidth: '800px', mx: 'auto'}}>
            <Typography mb={4} fontWeight="bold" variant="h4">
              Desserts
            </Typography>
            <Grid container spacing={2}>
              {productos.map((p, i) => (
                <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4 }} key={i}>
                  <ProductCard
                    name={p.name}
                    image={p.image}
                    category={p.category}
                    price={p.price}
                    index={i}
                    isClicked={p.isClicked}
                    quantity={p.quantity}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box sx={{
            backgroundColor: 'white', width: { xs: '80%', md: '30%', lg: 280 }, mx: 'auto',
            boxShadow: '0px 4px 10px rgba(0,0,0,0.05)', minHeight: '100%', py: 2, px: 4, borderRadius: 5,
            overflowY: 'auto',maxHeight:600
          }}>
            <Typography fontWeight="bold" color="hsl(14, 86%, 42%)" variant="h5">
              Your Cart ({total})
            </Typography>
            <Box
              sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', my: 2, }}
            >
              {productosAgregados.length > 0 ? (
                <>
                  {productosAgregados.map((p, i) => (
                    <Box
                      key={i}
                      sx={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', width: '100%',
                        my: 1, py: 2, borderBottom: '1px solid hsl(13, 31%, 94%)'
                      }}
                    >
                      <Box>
                        <Typography>{p.name}</Typography>
                        <Box
                          sx={{ display: 'flex', justifyContent: 'start', alignItems: 'start', flexDirection: 'row', gap: 2, }}
                        >
                          <Typography fontWeight="bold" color="hsl(14, 86%, 42%)">
                            {p.quantity}x
                          </Typography>
                          <Box
                            sx={{ display: 'flex', justifyContent: 'start', alignItems: 'start', flexDirection: 'row', }}
                          >
                            <Typography mr={1}>@</Typography>
                            <Typography mr={2}>${p.price.toFixed(2)}</Typography>
                            <Typography>${(p.price * p.quantity).toFixed(2)}</Typography>
                          </Box>
                        </Box>
                      </Box>
                      <Button
                        sx={{
                          border: '1px solid hsl(7, 20%, 60%)', borderRadius: '50%', width: 20, height: 20, minWidth: 0, display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        onClick={() => dispatch(remove(p.name))}
                      >
                        <Box component="img" src="/icon-remove-item.svg" />
                      </Button>
                    </Box>
                  ))}
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%',
                      my: 1,
                    }}
                  >
                    <Typography>Order Total</Typography>
                    <Typography fontWeight="bold" fontSize={27} variant="body1">
                      ${totalPagar.toFixed(2)}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', my: 2,
                      backgroundColor: 'hsl(13, 31%, 94%)', p: 1.5, width: '100%', borderRadius: 2,
                    }}
                  >
                    <Box component="img" src="/icon-carbon-neutral.svg" />
                    <Typography>This is a carbon-neutral delivery</Typography>
                  </Box>
                  <Button onClick={() => setOpen(true)} sx={{ width: '100%', backgroundColor: 'hsl(14, 86%, 42%)', borderRadius: 5,height:45 }} variant='contained'>Confirm Order</Button>
                </>
              ) : (
                <>
                  <Box component="img" src="/illustration-empty-cart.svg" sx={{ maxWidth: '100%' }} />
                  <Typography color="hsl(14, 25%, 72%)" variant="body2">
                    Your added items will appear here
                  </Typography>
                </>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
      <ModalConfirm productosAgregados={productosAgregados} open={open} onClose={() => setOpen(false)} />
    </Container>

  )
}

export default App