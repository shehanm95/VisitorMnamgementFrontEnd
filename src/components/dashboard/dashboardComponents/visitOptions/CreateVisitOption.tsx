
import React, { useEffect, useRef, useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import '../../../../components/common/css/form.css';
import { VisitOption } from '../../../../types/visitOption';
import { VisitOptionService } from '../../../../services/visitOptionService';
import { getTypeDetails, TypeDtails } from '../../../../services/typeKeeper';
import { useNavigate } from 'react-router-dom';
import { IconHeader } from '../../../common/IconHeader';

// Define Zod schema for form validation
const VisitOptionSchema = z.object({
    name: z.string().min(1, 'Visitor option name is required'),
    description: z.string().min(1, 'Description is required'),
    visitTypeId: z.number().min(1, 'Please select a visitor type'),
    preRegTime: z.object({
        hours: z.number().min(0),
        minutes: z.number().min(0).max(59),
    }),
    maxVisitors: z.number().min(1, 'Must allow at least 1 visitor'),
    workingDates: z.array(
        z.object({
            from: z.string(),
            to: z.string(),
        })
    ),
    collectDetails: z.object({
        email: z.boolean(),
        whatsapp: z.boolean(),
        visitorPhoto: z.boolean(),
        photoOptional: z.boolean(),
    }),
});

type VisitOptionForm = z.infer<typeof VisitOptionSchema>;

export const CreateVisitOption = () => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [imageFile, setImageFile] = React.useState<File | null>(null);
    const [imagePreview, setImagePreview] = React.useState<string | null>(null);
    const [generalError, setGeneralError] = useState<string | null>(null);

    const navigate = useNavigate();
    const details: TypeDtails = getTypeDetails();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm<VisitOptionForm>({
        resolver: zodResolver(VisitOptionSchema),
        defaultValues: {
            name: '',
            description: '',
            visitTypeId: 0,
            preRegTime: { hours: 0, minutes: 0 },
            maxVisitors: 1,
            workingDates: [{ from: '', to: '' }],
            collectDetails: { email: false, whatsapp: false, visitorPhoto: false, photoOptional: false },
        },
    });

    const workingDates = watch('workingDates');
    const preRegTime = watch('preRegTime');
    const maxVisitors = watch('maxVisitors');
    const isPreRegistrationChecked = !!preRegTime.hours || !!preRegTime.minutes || !!maxVisitors;

    useEffect(() => {
        if (details.currentVisitType == null) {
            navigate('/moderatorDashboard/visitOptions');
        }
    }, [details, navigate]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setImageFile(null);
            setImagePreview(null);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const addTimeRange = () => {
        setValue('workingDates', [...workingDates, { from: '', to: '' }]);
    };

    const updateTimeRange = (index: number, field: 'from' | 'to', value: string) => {
        const updatedRanges = [...workingDates];
        updatedRanges[index][field] = value;
        setValue('workingDates', updatedRanges);
    };

    const onSubmit = async (data: VisitOptionForm) => {
        try {
            const newVisitOption: VisitOption = {
                visitOptionName: data.name,
                description: data.description,

                visitType: details.currentVisitType,
                isPreRegistration: !!(preRegTime.hours || preRegTime.minutes || maxVisitors),
                imageName: imageFile ? imageFile.name : undefined,
                isPhotoRequired: data.collectDetails.visitorPhoto,
                isPhotoOptional: data.collectDetails.photoOptional,
                isPhoneNumberRequired: data.collectDetails.whatsapp,
                isEmailRequired: data.collectDetails.email,
                // preRegistration: {
                //     timeRequired: preRegTime.hours || preRegTime.minutes ? preRegTime : undefined,
                //     maxVisitors: maxVisitors > 0 ? maxVisitors : undefined,
                //     workingDates: workingDates.filter((range) => range.from && range.to),
                // },
            };

            const savedVisitOption = await VisitOptionService.createVisitOption(newVisitOption, imageFile || undefined);

            navigate('/moderatorDashboard/visitOptions');
        } catch (error) {
            console.error('Error saving visitor option:', error);
            setGeneralError('Failed to save visitor option. Please try again.');
        }
    };

    return (
        <div className="form-container">
            <IconHeader icon="fa-sliders-h" title="Create Visit Options" />

            <form onSubmit={handleSubmit(onSubmit)} className="form-content">
                {generalError && <span className="form-error-text">{generalError}</span>}

                <div className="form-group">
                    <label className="form-label">Visitor Option Name :</label>
                    <input
                        type="text"
                        className="form-input"
                        placeholder="Visitor Option Name"
                        {...register('name')}
                    />
                    {errors.name && <span className="form-error-text">{errors.name.message}</span>}
                </div>

                <div className="form-group">
                    <label className="form-label">Cover Image :</label>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                    />
                    <button type="button" onClick={triggerFileInput} className="form-button">
                        Choose Image
                    </button>
                    {imagePreview && <img src={imagePreview} alt="Preview" className="form-image" />}
                </div>

                <div className="form-group">
                    <label className="form-label">Visitor Option Description :</label>
                    <textarea
                        className="form-textarea"
                        placeholder="Describe the visitor option here"
                        {...register('description')}
                    ></textarea>
                    {errors.description && <span className="form-error-text">{errors.description.message}</span>}
                </div>

                <div className="form-group">
                    <label className="form-label">Visitor Type :</label>
                    <select
                        className="form-select"
                        {...register('visitTypeId', { valueAsNumber: true })}
                    >
                        <option value="">Select Visitor Type</option>
                        {details.vistTypes.map((type) => (
                            <option key={type.id} value={type.id}>
                                {type.visitTypeName}
                            </option>
                        ))}
                    </select>
                    {errors.visitTypeId && <span className="form-error-text">{errors.visitTypeId.message}</span>}
                </div>

                <div className="form-group">
                    <label className="form-label">
                        <input
                            type="checkbox"
                            checked={isPreRegistrationChecked}
                            onChange={(e) => {
                                if (!e.target.checked) {
                                    setValue('preRegTime', { hours: 0, minutes: 0 });
                                    setValue('maxVisitors', 1);
                                    setValue('workingDates', [{ from: '', to: '' }]);
                                }
                            }}
                        />
                        Pre-Registration
                    </label>

                    {isPreRegistrationChecked && (
                        <div id="preregObj" className="form-group">
                            <div className="form-subgroup">
                                <label className="form-sublabel">How much time you need for one visitor :</label>
                                <div className="form-time-inputs">
                                    <input
                                        type="number"
                                        className="form-input form-time-input"
                                        placeholder="Hr"
                                        {...register('preRegTime.hours', { valueAsNumber: true })}
                                    />
                                    <input
                                        type="number"
                                        className="form-input form-time-input"
                                        placeholder="Min"
                                        {...register('preRegTime.minutes', { valueAsNumber: true })}
                                    />
                                </div>
                            </div>
                            <div className="form-subgroup">
                                <label className="form-sublabel">How many visitors you can handle at once :</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    {...register('maxVisitors', { valueAsNumber: true })}
                                />
                            </div>
                            <div className="form-subgroup">
                                <label className="form-sublabel">What are the dates you can open for visits :</label>
                                {workingDates.map((range, index) => (
                                    <div key={index} className="form-time-range">
                                        <input
                                            type="time"
                                            className="form-input form-time-range-input"
                                            value={range.from}
                                            onChange={(e) => updateTimeRange(index, 'from', e.target.value)}
                                        />
                                        <span className="form-time-range-label">To:</span>
                                        <input
                                            type="time"
                                            className="form-input form-time-range-input"
                                            value={range.to}
                                            onChange={(e) => updateTimeRange(index, 'to', e.target.value)}
                                        />
                                    </div>
                                ))}
                                <button type="button" className="form-add-time-button" onClick={addTimeRange}>
                                    +
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="form-group">
                    <label className="form-label">About Collecting Basic Visitor Details :</label>
                    <div className="form-checkbox-group">
                        <label className="form-checkbox-label">
                            <input
                                type="checkbox"
                                {...register('collectDetails.email')}
                            />
                            Email required
                        </label>
                        <label className="form-checkbox-label">
                            <input
                                type="checkbox"
                                {...register('collectDetails.whatsapp')}
                            />
                            WhatsApp number required
                        </label>
                        <label className="form-checkbox-label">
                            <input
                                type="checkbox"
                                {...register('collectDetails.visitorPhoto')}
                            />
                            Must take visitor photo
                        </label>
                        <label className="form-checkbox-label">
                            <input
                                type="checkbox"
                                {...register('collectDetails.photoOptional')}
                            />
                            Photo optional
                        </label>
                    </div>
                </div>

                <div className="form-button-wrapper">
                    <button type="submit" className="form-save-button">
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}