"use client";

import { use } from "react";

import { ThemeContext } from "@/components/theme-context";

export const useTheme = () => use(ThemeContext);
