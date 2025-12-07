import { React } from "@webpack/common";
import { settings } from "../../settings.ts";

interface VirtualizedListProps {
    height: number;
    width?: string | number;
    itemCount: number;
    estimatedItemSize: number; // New prop for estimated height
    renderItem: ({ index, style, data, measureRef }: { index: number; style: React.CSSProperties; data: any; measureRef: (el: HTMLElement | null) => void }) => React.ReactElement;
    itemData: any;
}

const VirtualizedList: React.FC<VirtualizedListProps> = ({
    height,
    width = "100%",
    itemCount,
    estimatedItemSize,
    renderItem,
    itemData,
}) => {
    const listRef = React.useRef<HTMLDivElement>(null);
    const itemHeights = React.useRef<Record<number, number>>({});
    const [scrollTop, setScrollTop] = React.useState(0);
    const [, forceUpdate] = React.useReducer(x => x + 1, 0); // Used to force re-render when heights change

    // Memoized array of offsets for quick lookup
    const itemOffsets = React.useMemo(() => {
        const offsets = new Array(itemCount);
        let currentOffset = 0;
        for (let i = 0; i < itemCount; i++) {
            offsets[i] = currentOffset;
            currentOffset += itemHeights.current[i] || estimatedItemSize;
        }
        return offsets;
    }, [itemCount, itemHeights.current, estimatedItemSize]);

    // Calculate total height of all items
    const totalHeight = React.useMemo(() => {
        let sum = 0;
        for (let i = 0; i < itemCount; i++) {
            sum += itemHeights.current[i] || estimatedItemSize;
        }
        return sum;
    }, [itemCount, itemHeights.current, estimatedItemSize]);

    const onScroll = React.useCallback(() => {
        if (listRef.current) {
            setScrollTop(listRef.current.scrollTop);
        }
    }, []);

    React.useEffect(() => {
        const listElement = listRef.current;
        if (listElement) {
            listElement.addEventListener("scroll", onScroll);
            return () => {
                listElement.removeEventListener("scroll", onScroll);
            };
        }
    }, [onScroll]);

    // Find the first visible item
    const getStartIndex = (scroll: number) => {
        let low = 0;
        let high = itemCount - 1;
        let index = 0;

        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            if (itemOffsets[mid] <= scroll) {
                index = mid;
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return index;
    };

    const overscan = settings.store.overscanCount ?? 5; // Render a few extra items above and below the visible area

    const visibleStartIndex = getStartIndex(scrollTop);
    const visibleEndIndex = getStartIndex(scrollTop + height);

    const startIndex = Math.max(0, visibleStartIndex - overscan);
    const endIndex = Math.min(
        itemCount - 1,
        visibleEndIndex + overscan
    );

    const measureItem = React.useCallback((index: number, element: HTMLElement | null) => {
        if (element && itemHeights.current[index] !== element.offsetHeight) {
            itemHeights.current = {
                ...itemHeights.current,
                [index]: element.offsetHeight,
            };
            forceUpdate(); // Force a re-render to update offsets and total height
        }
    }, []);

    const items = [];
    for (let i = startIndex; i <= endIndex; i++) {
        const item = renderItem({
            index: i,
            style: {
                position: "absolute",
                top: itemOffsets[i],
                left: 0,
                width: "100%",
            },
            data: itemData,
            measureRef: (el: HTMLElement | null) => measureItem(i, el),
        });
        items.push(React.cloneElement(item, { key: itemData.notesArray[i].id }));
    }

    return (
        <div
            ref={listRef}
            style={{
                height,
                width,
                overflowY: "auto",
                position: "relative",
            }}
        >
            <div
                style={{
                    height: totalHeight,
                    width: "100%",
                    position: "relative",
                }}
            >
                {items}
            </div>
        </div>
    );
};

export default VirtualizedList;
