"use client";

import { useSyncExternalStore } from "react";
import {
  getPrefersReducedMotion,
  subscribePrefersReducedMotion,
} from "@/lib/animations/prefersReducedMotion";

function subscribe(callback: () => void) {
  return subscribePrefersReducedMotion(() => callback());
}

function getSnapshot() {
  return getPrefersReducedMotion();
}

function getServerSnapshot() {
  return false;
}

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
