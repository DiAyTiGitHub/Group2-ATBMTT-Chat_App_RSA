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
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LogoutIcon from '@mui/icons-material/Logout';

function ParticipantIndex(props: any) {
    const { expanded, handleChangeStateAccordion } = props;
    const [openModal, setOpenModal] = useState(false);

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
                    style={{ minHeight: "0" }}
                >
                    <Typography>Other Actions</Typography>
                </AccordionSummary>
                <AccordionDetails className="m-1 p-0">
                    <div className='list-item w-100' onClick={() => { setOpenModal(true) }}>
                        <PersonAddIcon className='mr-2' />
                        Add new participant
                    </div>
                    <div className='list-item w-100' onClick={() => { setOpenModal(true) }}>
                        <LogoutIcon className='mr-2' />
                        Leave this conversation
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

export default memo(observer(ParticipantIndex));