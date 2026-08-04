import type {BoardUI} from "../../shared/BoardUI";
import type {Player} from "../../shared/Player";
import {createContext, type ReactNode, use, useCallback, useState} from "react";
import type {Error_} from "../../shared/Error";

export type UIState = {
    board: BoardUI,
    users: Player[],
    ownId: string,
    error?: Error_
}

export type UIContextType = {
    state: UIState;
    changeState: (newState: Partial<UIState>) => void;
}

export const initialState: UIState = {
    board: new Array(64).fill("closed"),
    users: [],
    ownId: "",
};

export const UIContext = createContext<UIContextType>({state: initialState, changeState: () => {}});

export function useUIState() {
    const ctx = use(UIContext);
    if (!ctx) throw new Error("useUIState needs to be used inside UIProvider!");
    return ctx;
}

export function UIProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<UIState>(initialState);

    const changeState = useCallback((newState: Partial<UIState>) => {
        setState(prev => ({ ...prev, ...newState }));
    }, []);

    return (
        <UIContext.Provider value={{ state, changeState }}>
            {children}
        </UIContext.Provider>
    );
}
