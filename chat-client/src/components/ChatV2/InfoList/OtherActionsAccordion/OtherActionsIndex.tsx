import { observer } from 'mobx-react';
import React, { memo, useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import { useStore } from "src/stores";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button } from "@mui/material";
import InfoListModal from '../InfoListModal';

function ParticipantIndex(props: any) {
    const { expanded, handleChangeStateAccordion } = props;
    const [ openModal, setOpenModal ] = useState(false);

    return (
        <>
            <Accordion
                className="w-100"
                expanded={expanded === 'panel3'}
                onChange={handleChangeStateAccordion('panel3')}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Other Actions</Typography>
                </AccordionSummary>
                <AccordionDetails className="m-0 p-0">
                    <button
                        className="w-100 m-0 p-2"
                        onClick={() => {setOpenModal(true)}}
                    >
                        Add new participant
                    </button>
                    <button
                        className="w-100 m-0 p-2"
                        onClick={() => {setOpenModal(true)}}
                    >
                        Change conversation theme
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

export default memo(observer(ParticipantIndex));