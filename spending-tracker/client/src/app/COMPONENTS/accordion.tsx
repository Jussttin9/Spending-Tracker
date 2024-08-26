import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ReactNode } from 'react';
import Typography from './typography';

interface AccordionProps {
    title: string,
    children: ReactNode,
    defaultExpanded?: boolean,
    color?: string
}

export default function AccordionInfo ({ title, children, defaultExpanded, color='#d5771a' }: AccordionProps) {
    return (
        <div>
            <Accordion defaultExpanded={defaultExpanded} className="border-0 shadow-none w-5/6 rounded-5xl overflow-hidden px-2">
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                className='text-xl md:text-3xl'
                >
                    {title}
                </AccordionSummary>
                <AccordionDetails className='text-md md:text-xl'>
                    {children}
                </AccordionDetails>
            </Accordion>
        </div>
    );
}