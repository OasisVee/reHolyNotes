/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import { OptionType } from "@utils/types";

export const settings = definePluginSettings({
    overscanCount: {
        type: OptionType.NUMBER,
        description:
            "The number of messages to render above and below the visible area in the notebook view.",
        default: 5,
        restartNeeded: true,
    },
});
