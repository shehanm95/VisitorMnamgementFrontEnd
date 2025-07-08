import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import { useVisit } from '../../context/preRegContext';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_green.css'; // Choose a theme
import { english } from 'flatpickr/dist/l10n/default'; // Localization
import './flatPickerStypes.css'
import 'flatpickr/dist/themes/material_blue.css';
import { SpecificDate } from '../../types/SpecificDate';
import { VisitService } from '../../services/visitService';
import { VisitRow } from '../../types/VisitRow';
import { AvailableDataListShow } from './subPreReg/AvailableDateListShow';
import './subPreReg/selectVisitRow.css'

// Schema for visit row data
const visitRowSchema = z.object({
    id: z.number(),
    date: z.string().refine(val => !isNaN(Date.parse(val))),
});

export const PreRegSetVisitRow = () => {
    const { visit, setVisit } = useVisit();
    console.log(visit)
    const [availableDates, setAvailableDates] = useState<SpecificDate[]>([]);
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [visitRows, setVisitRows] = useState<VisitRow[]>();

    // Fetch available dates
    useEffect(() => {
        const fetchAvailableDates = async () => {
            const allowedDates = visit.visitOption?.specificDates;
            console.log(allowedDates)
            if (allowedDates) {
                setAvailableDates(allowedDates);
            }
        };
        fetchAvailableDates();
    }, []);

    const handleDateChange = (dates: Date[]) => {
        if (dates.length > 0) {
            const dateObj = dates[0];
            const year = dateObj.getFullYear();
            const month = String(dateObj.getMonth() + 1).padStart(2, '0');
            const day = String(dateObj.getDate()).padStart(2, '0');
            const selected = `${year}-${month}-${day}`;

            setSelectedDate(selected);

            const visitRow = { id: 1, date: selected };
            try {
                visitRowSchema.parse(visitRow);
                setVisit({ ...visit, visitRow });
            } catch (error) {
                console.error('Validation error:', error);
                alert('Invalid date selection');
                setSelectedDate('');
            }
        }
    };

    // Convert available dates to Date objects for Flatpickr
    const enabledDates = availableDates
        .filter(date => !isNaN(Date.parse(date.date)))
        .map(date => new Date(date.date));

    const fetchVisitRows = async () => {

        try {
            if (!visit.visitOption) {
                throw new Error("Visit option is required");
            }

            const vr = await VisitService.getVisitRowsForDate({
                visitOption: visit.visitOption,
                date: selectedDate
            });
            console.log(vr)
            console.log("tyring to peint visit rows")
            setVisitRows(vr);
        } catch (error) {
            console.error("Failed to fetch visit rows:", error);
        }
        console.log(visitRows)
    }

    useEffect(() => {
        const frows = async () => {
            console.log("tyring to peint visit rows")
            try {
                if (!visit.visitOption) {
                    throw new Error("Visit option is required");
                }

                const vr = await VisitService.getVisitRowsForDate({
                    visitOption: visit.visitOption,
                    date: selectedDate
                });
                console.log(vr)
                console.log("tyring to peint visit rows")
                setVisitRows(vr);
            } catch (error) {
                console.error("Failed to fetch visit rows:", error);
            }

        }
        frows();
    }, [selectedDate])


    return (
        <div className="date-selection-container">
            <h3>Select Visit Date</h3>

            <div className="date-input-container">
                <label htmlFor="visit-date">Choose a date:</label>
                <Flatpickr
                    id="visit-date"
                    options={{
                        dateFormat: 'Y-m-d',
                        enable: enabledDates,
                        locale: english, // Optional localization
                        minDate: 'today', // Optional: don't allow past dates
                        disableMobile: true, // Better UX on mobile devices
                    }}
                    value={selectedDate}
                    onChange={handleDateChange}
                    className="flatpickr-input"
                    placeholder="Select available date"
                />
                {selectedDate ? <button onClick={fetchVisitRows} className='form-button'>Check Visit Times</button> : <p>No selected date</p>}
            </div>

            <AvailableDataListShow
                availableDates={availableDates}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate} />

            <div className="selectedDate">
                <h2>{selectedDate}</h2>
            </div>

            {/* ============== */}
            <div className="row-container">
                <span className="row-time">08:00 - 08:15 :</span>
                <div className="row-circles">
                    <div className="row-circle row-circle-filled"></div>
                    <div className="row-circle row-circle-filled"></div>
                    <div className="row-circle row-circle-available"></div>
                    <div className="row-circle row-circle-available"></div>
                    <div className="row-circle row-circle-available"></div>
                </div>
            </div>



            {/* ============== */}


            {visitRows && visitRows.length > 0 ? (
                visitRows.map((v) => <p key={v.id}>{v.startTime} - {v.endTime}</p>)
            ) : (
                <p>No visits scheduled</p>
            )}


        </div>
    );
};