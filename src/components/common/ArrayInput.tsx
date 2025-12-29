'use client';

import { useState, KeyboardEvent } from 'react';
import { X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface ArrayInputProps {
    value: string[];
    onChange: (value: string[]) => void;
    placeholder?: string;
    label?: string;
}

export function ArrayInput({ value = [], onChange, placeholder = 'Type and press Enter...' }: ArrayInputProps) {
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addValue();
        }
    };

    const addValue = () => {
        const trimmed = inputValue.trim();
        if (trimmed && !value.includes(trimmed)) {
            onChange([...value, trimmed]);
            setInputValue('');
        }
    };

    const removeValue = (indexToRemove: number) => {
        onChange(value.filter((_, index) => index !== indexToRemove));
    };

    return (
        <div className="space-y-3">
            <div className="flex gap-2">
                <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className="bg-[#2A2A2E] border-[#3FA9F5]/50 text-white placeholder-[#B0B0B0] focus:border-[#3FA9F5] focus:ring-[#3FA9F5]/30"
                />
                <Button
                    type="button"
                    onClick={addValue}
                    variant="secondary"
                    className="shrink-0 bg-[#3FA9F5]/20 text-[#3FA9F5] hover:bg-[#3FA9F5]/30 hover:text-white"
                >
                    <Plus className="w-4 h-4" />
                </Button>
            </div>

            {value.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {value.map((item, index) => (
                        <Badge
                            key={index}
                            variant="secondary"
                            className="bg-[#3FA9F5]/20 text-[#3FA9F5] border border-[#3FA9F5]/30 pl-2 pr-1 py-1 flex items-center gap-1"
                        >
                            {item}
                            <button
                                type="button"
                                onClick={() => removeValue(index)}
                                className="hover:bg-[#3FA9F5]/20 rounded-full p-0.5 transition-colors"
                                aria-label={`Remove ${item}`}
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </Badge>
                    ))}
                </div>
            )}
        </div>
    );
}
