import { Box, Button, Typography, Modal, Divider } from '@mui/material';
import { Producto } from '../utils/products';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { cleanOrder, orderTotal } from '../store/productSlice';
import { useSelector } from 'react-redux';

type Props = {
    open: boolean;
    onClose: () => void;
    productosAgregados: Producto[]
};

const ModalConfirm = ({ open, onClose, productosAgregados }: Props) => {

    const dispatch = useDispatch<AppDispatch>()
    const totalPagar = useSelector(orderTotal)
    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{position: 'absolute',top: '50%',left: '50%',transform: 'translate(-50%, -50%)',backgroundColor: 'white',
                    width: 400,maxWidth: '90%',p: 4,borderRadius: {xs:7,sm:4},boxShadow: 24,
                    display: 'flex',flexDirection: 'column',alignItems: 'center',outline: 'none',
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'start', flexDirection: 'column', width: '100%' }}>
                    <Box
                        sx={{
                            width: 40, height: 40, borderRadius: '50%', backgroundColor: '#e6f4ea', display: 'flex',
                            justifyContent: 'center', alignItems: 'center', mb: 1,
                        }}
                    >
                        <Box sx={{ width: 40 }} component={'img'} src='/icon-order-confirmed.svg' />
                    </Box>
                    <Typography fontSize={35} variant="h5" fontWeight="bold" color="#3b0a00" textAlign="center" mb={1}>
                        Order Confirmed
                    </Typography>

                    <Typography variant="body2" color="gray" textAlign="center" mb={3}>
                        We hope you enjoy your food!
                    </Typography>
                </Box>

                <Box sx={{ backgroundColor: '#fef6f4', width: '100%', borderRadius: 2, p: 2, mb: 3, overflowY: 'auto', maxHeight: 300 }}>
                    {
                        productosAgregados.map(p => (
                            <>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 2 }}>
                                        <Box sx={{ width: 40, height: 40 }} component={'img'} src={p.image.thumbnail} />
                                        <Box>
                                            <Typography fontWeight="bold">{p.name}</Typography>
                                            <Box
                                                sx={{ display: 'flex', justifyContent: 'start', alignItems: 'start', flexDirection: 'row', gap: 2 }}
                                            >
                                                <Typography variant='body2' fontWeight="bold" color="hsl(14, 86%, 42%)">
                                                    {p.quantity}x
                                                </Typography>
                                                <Box
                                                    sx={{ display: 'flex', justifyContent: 'start', alignItems: 'start', flexDirection: 'row', }}
                                                >
                                                    <Typography variant='body2' mr={1}>@</Typography>
                                                    <Typography variant='body2' mr={2}>${p.price.toFixed(2)}</Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Typography variant='body2' fontWeight="bold">${(p.price * p.quantity).toFixed(2)}</Typography>
                                </Box>
                                <Divider sx={{ mb: 2 }} />
                            </>
                        ))
                    }
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
                        <Typography fontSize={15} variant='body2'>Order Total</Typography>
                        <Typography fontSize={20} fontWeight="bold" >${totalPagar.toFixed(2)}</Typography>
                    </Box>
                </Box>

                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: 'hsl(14, 86%, 42%)', color: 'white', fontWeight: 'bold',
                        width: '100%', py: 1, borderRadius: 3, textTransform: 'none',
                        '&:hover': {
                            backgroundColor: '#b23208',
                        },
                    }}
                    onClick={() => {
                        onClose()
                        dispatch(cleanOrder())
                    }}
                >
                    Start New Order
                </Button>
            </Box>
        </Modal>
    );
};

export default ModalConfirm;
