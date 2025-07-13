import React, { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { number, z } from 'zod';
import { ServicePoint } from '../../../types/ServicePoint';
import { ServicePointStatus } from '../../../types/ServicePointStatus';
import { ServicePointService } from '../../../services/ServicePointService';
import '../../common/css/form.css';
import { IconHeader } from '../../common/IconHeader';
import { toast } from 'react-toastify';
import { FrontPageService } from '../../../frontServices/FrontPageSerivce';
import { DynamicQuestionSchema } from './visitOptions/AddDynamicQuestion';
import { PopUpWindow } from '../../common/PopUpWindow';
import { AddOfficerDuty } from './servicePointComps/AddOfficerDuty';


const dutySchema = z.object({
    id: z.number(),
    officer: z.object({ id: z.number() }),
    dutyState: z.enum(['PENDING', 'ACCEPTED', 'DECLINED']),
    AcceptedTime: z.string().optional()
})

// Define Zod schema for form validation
const servicePointSchema = z.object({
    pointName: z.string().min(1, 'Name is required'),
    pointDescription: z.string().optional(),
    officerInstructions: z.string().optional(),
    visitorInstructions: z.string().optional(),
    isFrontOffice: z.boolean(),
    isHost: z.boolean(),
    servicePointStatus: z.nativeEnum(ServicePointStatus),
    visitOption: z.object({ id: z.number() }),
    duties: z.array(dutySchema),
    officerQuestions: z.array(DynamicQuestionSchema)
});

type ServicePointFormData = z.infer<typeof servicePointSchema>;

export const AddServicePoint = () => {
    const servicePointService = new ServicePointService();
    const frontService = FrontPageService.getInstance();
    const visitOption = frontService.getSelectedVisitOption();
    const [addOfficerQuestion, setAddOfficerQuestion] = useState(false)
    const [addOfficer, setAddOfficer] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        watch,
        control
    } = useForm<ServicePointFormData>({
        resolver: zodResolver(servicePointSchema),
        defaultValues: {
            isFrontOffice: false,
            isHost: false,
            servicePointStatus: ServicePointStatus.ACTIVE,
            visitOption: { id: 0 },
            duties: [],
            officerQuestions: []
        }
    });

    const { fields: dutyList, append: appendDuty, remove: removeDuty } = useFieldArray({ control, name: 'duties' });
    const { fields: questionList, append: appendQuestion, remove: removeQuestion } = useFieldArray({ control, name: 'officerQuestions' });

    const onSubmit = async (data: any) => {
        try {
            const servicePointData: Partial<ServicePoint> = {
                ...data,
                visitOption: { id: data.visitOptionId } as any // Temporary type assertion
            };

            const createdServicePoint = await servicePointService.createServicePoint(servicePointData);
            toast.success('Service point created successfully!');
            reset();
            // You might want to redirect or update state here
        } catch (error) {
            toast.error('Failed to create service point');
            console.error('Error creating service point:', error);
        }
    };

    return (
        <div className="form-container">
            <IconHeader icon="fa-sliders-h" title="Service Point" />

            <form onSubmit={handleSubmit(onSubmit)} className="form-content">
                <div className="form-group">
                    <label className="form-label">Service Point Name*</label>
                    <input
                        type="text"
                        className={`form-input ${errors.pointName ? 'error' : ''}`}
                        placeholder="Enter service point name"
                        {...register('pointName')}
                    />
                    {errors.pointName && (
                        <span className="form-error">{errors.pointName.message}</span>
                    )}
                </div>

                <div className="form-group">
                    <label className="form-label">
                        <input
                            type="checkbox"
                            {...register('isFrontOffice')}
                        />{" "}
                        Is This A Front Office
                    </label>
                    <label className="form-label">
                        <input
                            type="checkbox"
                            {...register('isHost')}
                        />{" "}
                        Is This A Host
                    </label>
                </div>

                <div className="form-group">
                    <label className="form-label">Service Point Description</label>
                    <textarea
                        className="form-textarea"
                        placeholder="Service point description here"
                        {...register('pointDescription')}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Officer Instructions</label>
                    <textarea
                        className="form-textarea"
                        placeholder="Officer instructions here"
                        {...register('officerInstructions')}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Visitor Instructions</label>
                    <textarea
                        className="form-textarea"
                        placeholder="Visitor instructions here"
                        {...register('visitorInstructions')}
                    />
                </div>

                <hr />

                {/* Duty Officers Area - To be implemented */}
                <div className="form-group">
                    <div>
                        <label className="form-label w-150px">Duty Officers:</label>
                        <button type="button" className="vO-add-button">
                            <i className="fas fa-plus-circle"></i> Add Officer
                        </button>
                    </div>
                    <div className="form-subgroup">
                        {/* Officers will be added here */}
                    </div>
                </div>

                <hr />

                {/* Officer Questions Area - To be implemented */}
                <div className="form-group">
                    <div>
                        <label className="form-label">Officer Questions:</label>
                        <button type="button" onClick={() => setAddOfficerQuestion(true)} className="vO-add-button">
                            <i className="fas fa-plus-circle"></i> Add Question
                        </button>
                    </div>
                    <div className="form-subgroup">
                        {/* Questions will be added here */}
                    </div>
                </div>

                <div className="form-button-wrapper">
                    <button
                        type="submit"
                        className="form-save-button form-button"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Saving...' : 'Save'}
                    </button>
                    <button type="button" className="form-save-button form-button ms-3">
                        Next
                    </button>
                </div>
            </form>
            {addOfficerQuestion &&
                <PopUpWindow onClose={() => setAddOfficerQuestion(false)} children={<AddOfficerDuty></AddOfficerDuty>}>
                </PopUpWindow>}

            {addOfficer &&
                <PopUpWindow onClose={() => setAddOfficerQuestion(false)} children={<h2>this is popup</h2>}>
                </PopUpWindow>}

        </div>
    );
};