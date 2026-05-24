'use client';

import { useState, FormEvent } from 'react';
import { leadService, LeadData, type LeadSubmissionResult, LeadService } from '../../lib/lead-service';

interface LeadFormProps {
    children: React.ReactNode;
    onSubmit?: (result: LeadSubmissionResult) => void;
    sourceForm: string;
    businessType?: string;
    serviceInterest?: string;
    className?: string;
    disabled?: boolean;
}

export default function LeadForm({
    children,
    onSubmit,
    sourceForm,
    businessType,
    serviceInterest,
    className = '',
    disabled = false
}: LeadFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (disabled) return;
        
        setIsSubmitting(true);
        setSubmitStatus('idle');
        setErrorMessage('');

        const form = e.currentTarget;
        const formData = new FormData(form);

        // Extract form data
        const leadData: LeadData = {
            full_name: formData.get('name') as string || formData.get('full_name') as string || undefined,
            email: formData.get('email') as string || undefined,
            phone: formData.get('phone') as string || undefined,
            company: formData.get('company') as string || formData.get('business_name') as string || undefined,
            website: formData.get('website') as string || undefined,
            message: formData.get('message') as string || undefined,
            business_type: businessType || formData.get('business_type') as string || undefined,
            service_interest: serviceInterest || formData.get('service_interest') as string || undefined,
            source_page: LeadService.getCurrentSourcePage(),
            source_form: sourceForm,
            ...LeadService.getUtmParameters(),
        };

        try {
            const result = await leadService.submitLeadWithRetry(leadData, 2);
            
            if (result.success) {
                setSubmitStatus('success');
                
                // Call the optional onSubmit callback
                if (onSubmit) {
                    onSubmit(result);
                }

                // Reset form after successful submission
                form.reset();
            } else {
                setSubmitStatus('error');
                setErrorMessage(result.error || 'Submission failed. Please try again.');
                
                if (onSubmit) {
                    onSubmit(result);
                }
            }
        } catch (error) {
            setSubmitStatus('error');
            setErrorMessage('An unexpected error occurred. Please try again.');
            console.error('Form submission error:', error);
            
            if (onSubmit) {
                onSubmit({
                    success: false,
                    error: 'An unexpected error occurred'
                });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={className}
            data-submit-status={submitStatus}
        >
            {isSubmitting && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-8 text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                        <p className="text-white font-medium">Submitting...</p>
                    </div>
                </div>
            )}
            
            {submitStatus === 'success' && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-[#0f172a] border border-green-500/30 rounded-2xl p-8 text-center max-w-md mx-4">
                        <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-white font-bold text-lg mb-2">Success!</h3>
                        <p className="text-slate-400 text-sm mb-6">Your information has been submitted successfully.</p>
                        <button
                            onClick={() => setSubmitStatus('idle')}
                            className="px-6 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {submitStatus === 'error' && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-[#0f172a] border border-red-500/30 rounded-2xl p-8 text-center max-w-md mx-4">
                        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <h3 className="text-white font-bold text-lg mb-2">Submission Failed</h3>
                        <p className="text-slate-400 text-sm mb-6">{errorMessage}</p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setSubmitStatus('idle')}
                                className="flex-1 px-4 py-3 bg-slate-700 text-white rounded-lg font-medium hover:bg-slate-600 transition-colors"
                            >
                                Try Again
                            </button>
                            <button
                                onClick={() => {
                                    setSubmitStatus('idle');
                                    window.location.href = 'mailto:ayush@brandverse.tech';
                                }}
                                className="flex-1 px-4 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                            >
                                Email Us
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Disable form elements during submission */}
            {isSubmitting ? (
                <div className="pointer-events-none opacity-50">
                    {children}
                </div>
            ) : (
                children
            )}
        </form>
    );
}

// =====================================================
// SUCCESS MESSAGE COMPONENT
// =====================================================

interface SuccessMessageProps {
    title?: string;
    message?: string;
    onDismiss?: () => void;
    redirectUrl?: string;
}

export function SuccessMessage({
    title = "Success!",
    message = "Your information has been submitted successfully.",
    onDismiss,
    redirectUrl
}: SuccessMessageProps) {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-[#0f172a] border border-green-500/30 rounded-2xl p-8 text-center max-w-md mx-4">
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
                <p className="text-slate-400 text-sm mb-6">{message}</p>
                <div className="flex gap-3">
                    {redirectUrl ? (
                        <button
                            onClick={() => window.location.href = redirectUrl}
                            className="flex-1 px-6 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
                        >
                            Continue
                        </button>
                    ) : null}
                    {onDismiss ? (
                        <button
                            onClick={onDismiss}
                            className="px-6 py-3 bg-slate-700 text-white rounded-lg font-medium hover:bg-slate-600 transition-colors"
                        >
                            Close
                        </button>
                    ) : null}
                </div>
            </div>
        </div>
    );
}