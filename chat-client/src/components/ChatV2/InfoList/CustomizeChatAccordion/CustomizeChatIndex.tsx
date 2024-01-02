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

function CustomizeChatIndex(props: any) {
    const { expanded, handleChangeStateAccordion } = props;
    const [ openModal, setOpenModal ] = useState(false);

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
                >
                    <Typography>Customzie Chat</Typography>
                </AccordionSummary>
                <AccordionDetails className="m-0 p-0">
                    <button
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
                    </button>
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