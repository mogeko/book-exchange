"use client";

import { use } from "react";

import { ThemeContext } from "@/components/theme-wrapper";

export const useTheme = () => use(ThemeContext);
