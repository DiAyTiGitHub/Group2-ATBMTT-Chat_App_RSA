import { observer } from 'mobx-react';
import React, { memo } from 'react';
import { useStore } from "src/stores";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button } from "@mui/material";
import InfoListModal from '../InfoListModal';
import { useState } from 'react';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import TripOriginIcon from '@mui/icons-material/TripOrigin';
import PhotoIcon from '@mui/icons-material/Photo';

function CustomizeChatIndex(props: any) {
    const { expanded, handleChangeStateAccordion } = props;
    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <Accordion
                className="w-100"
                expanded={expanded === 'panel1'}
                onChange={handleChangeStateAccordion('panel1')}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    style={{ minHeight: "0"}}
                >
                    <Typography>
                        Customzie Chat
                    </Typography>
                </AccordionSummary>
                <AccordionDetails className="m-1 p-0">
                    {/* <button
                        className="w-100 m-0 p-2"
                        onClick={() => {setOpenModal(true)}}
                    >
                        Change conversation name
                    </button>
                    <button
                        className="w-100 m-0 p-2"
                        onClick={() => {setOpenModal(true)}}
                    >
                        Change conversation theme
                    </button>
                    <button
                        className="w-100 m-0 p-2"
                        onClick={() => {setOpenModal(true)}}
                    >
                        Change conversation photo
                    </button> */}
                    <div className='list-item w-100' onClick={() => { setOpenModal(true) }}>
                        <BorderColorIcon className='mr-2'/>
                        Change conversation name
                    </div>
                    <div className='list-item w-100' onClick={() => { setOpenModal(true) }}>
                        <TripOriginIcon className='mr-2' style={{color: "#1A8BDF"}}/>
                        Change conversation theme
                    </div>
                    <div className='list-item w-100' onClick={() => { setOpenModal(true) }}>
                        <PhotoIcon className='mr-2'/>
                        Change conversation photo
                    </div>
                </AccordionDetails>
            </Accordion>

            {openModal && (
                <InfoListModal
                    open={openModal}
                    handleClose={function () {
                        setOpenModal(false);
                    }}
                />
            )}
        </>
    );
}

export default memo(observer(CustomizeChatIndex));