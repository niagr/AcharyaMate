declare module "react-native-scrollable-tab-view" {

    export interface ScrollableTabViewProps {
        tabBarActiveTextColor: string;
        tabBarInactiveTextColor: string;
        tabBarUnderlineColor: string;
        tabBarBackgroundColor: string;
        prerenderingSiblingsNumber: number;
    }

    export interface ScrollableTabView extends React.ComponentClass<ScrollableTabViewProps> {}
    let ScrollableTabView: ScrollableTabView;
    export default ScrollableTabView;
}