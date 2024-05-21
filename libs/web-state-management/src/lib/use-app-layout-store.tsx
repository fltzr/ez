import type { ReactNode } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Mode as Theme, Density } from '@cloudscape-design/global-styles';
import type { AppLayoutProps } from '@cloudscape-design/components';

type AppLayoutState = {
  contentLayout: AppLayoutProps['contentType'];
  // Content states
  toolsContent?: ReactNode;
  splitPanelContent?: ReactNode;
  drawerPanels: Array<AppLayoutProps.Drawer>;
  // Toggle states
  isNavigationOpen: boolean;
  isToolsOpen: boolean;
  isSplitPanelOpen: boolean;
  // UI states
  theme: Theme;
  density: Density;
};

type AppLayoutActions = {
  setContentLayout: (layout: AppLayoutProps['contentType']) => void;
  // Content setters
  setToolsContent: (content?: ReactNode) => void;
  setSplitPanelContent: (content?: ReactNode) => void;
  addDrawerPanel: (drawer: AppLayoutProps.Drawer) => void;
  removeDrawerPanel: (id: string) => void;
  // Toggle setters
  setNavigationOpen: (state: boolean) => void;
  setToolsOpen: (state: boolean) => void;
  setSplitPanelOpen: (state: boolean) => void;
  // UI setters
  setTheme: (theme: Theme) => void;
  setDensity: (density: Density) => void;
};

export const useAppLayoutStore = create<AppLayoutState & AppLayoutActions>()(
  persist(
    (set) => ({
      // Default states
      contentLayout: 'default',
      // Content
      toolsContent: undefined,
      splitPanelContent: undefined,
      drawerPanels: [],
      // Toggles
      isNavigationOpen: true,
      isToolsOpen: false,
      isSplitPanelOpen: false,
      // UI
      theme: Theme.Light,
      density: Density.Comfortable,
      // Actions
      setContentLayout: (contentLayout) => set(() => ({ contentLayout })),
      // Content setters
      setToolsContent: (toolsContent) => set(() => ({ toolsContent })),
      setSplitPanelContent: (splitPanelContent) => set(() => ({ splitPanelContent })),
      addDrawerPanel: (drawer) =>
        set((s) => {
          if (s.drawerPanels.every((d) => d.id !== drawer.id)) {
            return { drawerPanels: [{ ...drawer }, ...s.drawerPanels] };
          }

          return { drawerPanels: s.drawerPanels };
        }),
      removeDrawerPanel: (id) =>
        set((s) => ({ drawerPanels: s.drawerPanels?.filter((d) => d.id !== id) })),
      // Toggle setters
      setNavigationOpen: (isNavigationOpen) => set(() => ({ isNavigationOpen })),
      setToolsOpen: (isToolsOpen) => set(() => ({ isToolsOpen })),
      setSplitPanelOpen: (isSplitPanelOpen) => set(() => ({ isSplitPanelOpen })),
      // UI setters
      setTheme: (theme) => set(() => ({ theme })),
      setDensity: (density) => set(() => ({ density })),
    }),
    {
      name: '__MW::AppLayoutStore',
      partialize: ({ contentLayout, isToolsOpen, isSplitPanelOpen, theme, density }) => ({
        contentLayout,
        isToolsOpen,
        isSplitPanelOpen,
        theme,
        density,
      }),
    }
  )
);
