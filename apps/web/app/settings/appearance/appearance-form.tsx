"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/use-theme";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import systemPreview from "@/app/settings/_images/auto-preview.svg";
import darkPreview from "@/app/settings/_images/dark-preview.svg";
import lightPreview from "@/app/settings/_images/write-preview.svg";

export const AppearanceForm: React.FC = () => {
  const { setTheme, theme } = useTheme();

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <Label>Theme</Label>
        <p className="text-muted-foreground text-sm">
          Select the theme for the dashboard.
        </p>
        <RadioGroup
          onValueChange={(value) => setTheme(value)}
          defaultValue={theme}
          className="grid grid-cols-3 gap-8 pt-2"
        >
          <Label className="space-y-2">
            <RadioGroupItem value="system" className="sr-only" />
            <Image
              alt="Preview about theme (system)"
              className={cn(
                "bg-popover hover:bg-accent items-center rounded-md border-2 p-1",
                theme === "system" ? "border-primary" : "border-muted"
              )}
              src={systemPreview}
            />
            <span className="block w-full p-2 text-center font-normal">
              System
            </span>
          </Label>
          <Label className="space-y-2">
            <RadioGroupItem value="light" className="sr-only" />
            <Image
              alt="Preview about theme (light)"
              className={cn(
                "bg-popover hover:bg-accent items-center rounded-md border-2 p-1",
                theme === "light" ? "border-primary" : "border-muted"
              )}
              src={lightPreview}
            />
            <span className="block w-full p-2 text-center font-normal">
              Light
            </span>
          </Label>
          <Label className="space-y-2">
            <RadioGroupItem value="dark" className="sr-only" />
            <Image
              alt="Preview about theme (dark)"
              className={cn(
                "bg-popover hover:bg-accent items-center rounded-md border-2 p-1",
                theme === "dark" ? "border-primary" : "border-muted"
              )}
              src={darkPreview}
            />
            <span className="block w-full p-2 text-center font-normal">
              Dark
            </span>
          </Label>
        </RadioGroup>
      </div>
    </div>
  );
};
