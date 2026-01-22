import * as React from "react";
import { PhoneInput as BasePhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

import { cn } from "@/lib/utils";

export interface PhoneInputProps {
        value?: string;
        onChange?: (value: string) => void;
        className?: string;
        defaultCountry?: string;
        placeholder?: string;
}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
        ({ value, onChange, className, defaultCountry = "us", placeholder = "Enter phone number" }, ref) => {
                return (
                        <BasePhoneInput
                                defaultCountry={defaultCountry}
                                value={value}
                                onChange={onChange}
                                placeholder={placeholder}
                                className={cn("flex w-full rounded-lg border border-input bg-background", className)}
                                inputClassName={cn(
                                        "!w-full !h-full !text-base !bg-transparent !outline-none !shadow-none !px-4 !text-slate-900",
                                        "placeholder:!text-slate-400 focus:!ring-2 focus:!ring-ring focus:!ring-offset-2"
                                )}
                                countrySelectorStyleProps={{
                                        buttonClassName: cn(
                                                "!h-full !px-3 !bg-slate-50 !border-r !border-slate-200 !rounded-l-lg hover:!bg-slate-100 !transition-colors !border-y-0 !border-l-0"
                                        ),
                                        buttonContentWrapperClassName: "!flex !items-center !gap-2",
                                }}
                                style={{
                                        "--react-international-phone-height": "3.5rem",
                                        "--react-international-phone-border-radius": "0.5rem",
                                        "--react-international-phone-border-color": "rgb(226 232 240)",
                                        "--react-international-phone-border-width": "1px",
                                        "--react-international-phone-background-color": "white",
                                        "--react-international-phone-text-color": "rgb(15 23 42)",
                                        "--react-international-phone-selected-dropdown-item-background-color": "rgb(248 250 252)",
                                        "--react-international-phone-country-selector-background-color-hover": "rgb(241 245 249)",
                                        "--react-international-phone-dropdown-item-background-color-hover": "rgb(248 250 252)",
                                } as React.CSSProperties}
                        />
                );
        }
);

PhoneInput.displayName = "PhoneInput";

export { PhoneInput };