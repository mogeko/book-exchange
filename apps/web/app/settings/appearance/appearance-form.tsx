"use client";

import { useCallback } from "react";
import Image from "next/image";
import { RxCheck } from "react-icons/rx";

import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/use-theme";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import systemPreview from "@/app/settings/_images/auto-preview.svg";
import darkPreview from "@/app/settings/_images/dark-preview.svg";
import lightPreview from "@/app/settings/_images/write-preview.svg";

export const AppearanceForm: React.FC = () => {
  const { setTheme, theme } = useTheme();

  const ColorSwatcher = useCallback(
    ({ name, themeName }: { name: string; themeName: string }) => {
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full border-2 text-xs",
                theme.color === name ? "border-primary" : "border-transparent",
                themeName
              )}
              onClick={() => setTheme({ color: name })}
            >
              <span
                className={cn(
                  "bg-primary flex h-6 w-6 items-center justify-center rounded-full",
                  themeName
                )}
              >
                {theme.color === name && (
                  <RxCheck className="h-4 w-4 text-white" />
                )}
              </span>
              <span className="sr-only">{name}</span>
            </button>
          </TooltipTrigger>
          <TooltipContent
            align="center"
            className="rounded-[0.5rem] bg-zinc-900 text-zinc-50"
          >
            {name}
          </TooltipContent>
        </Tooltip>
      );
    },
    [theme.color, setTheme]
  );

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <Label>Color scheme</Label>
        <p className="text-muted-foreground text-sm">Select the theme color.</p>
        <div className="mr-2 flex items-center space-x-0.5">
          <TooltipProvider>
            <ColorSwatcher name="zinc" themeName="theme-zinc" />
            <ColorSwatcher name="rose" themeName="theme-rose" />
            <ColorSwatcher name="blue" themeName="theme-blue" />
            <ColorSwatcher name="green" themeName="theme-green" />
            <ColorSwatcher name="orange" themeName="theme-orange" />
          </TooltipProvider>
        </div>
      </div>
      <div className="space-y-1">
        <Label>Light/Dark mode</Label>
        <p className="text-muted-foreground text-sm">
          Select the theme for the dashboard.
        </p>
        <RadioGroup
          onValueChange={(value) => setTheme({ mode: value })}
          defaultValue={theme.mode}
          className="grid grid-cols-3 gap-8 pt-2"
        >
          <Label className="space-y-2">
            <RadioGroupItem value="system" className="sr-only" />
            <Image
              alt="Preview about theme (system)"
              className={cn(
                "bg-popover hover:bg-accent items-center rounded-md border-2 p-1",
                theme.mode === "system" ? "border-primary" : "border-muted"
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
                theme.mode === "light" ? "border-primary" : "border-muted"
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
                theme.mode === "dark" ? "border-primary" : "border-muted"
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
