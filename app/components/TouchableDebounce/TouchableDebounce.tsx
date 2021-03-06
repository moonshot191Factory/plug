import * as React from "react";
import { PureComponent } from "react";
import {
  ActivityIndicator,
  ActivityIndicatorProps,
  GestureResponderEvent,
  TouchableOpacity,
  TouchableOpacityProps
} from "react-native";

export interface TouchableDebounceProps extends TouchableOpacityProps {
  /**
   * Duration delay for the next action. Default = 500ms
   */
  interval?: number;
  loading?: boolean;
  loadingProps?: ActivityIndicatorProps;
}

class TouchableDebounce extends PureComponent<TouchableDebounceProps> {
  public static defaultProps: Partial<TouchableDebounceProps> = {
    loading: false
  };
  private keepDelay: boolean = true;
  private defaultInterval: number = 500;

  constructor(props: TouchableOpacityProps) {
    super(props);
    // this.debounce = this.debounce.bind(this);
  }

  public debounce = (event: GestureResponderEvent) => {
    if (this.props.onPress) {
      if (this.keepDelay) {
        this.keepDelay = false;
        this.props.onPress(event);
        setTimeout(() => {
          this.keepDelay = true;
        }, this.props.interval || this.defaultInterval);
      }
    }
  };

  public render() {
    return (
      <TouchableOpacity {...this.props} onPress={this.debounce}>
        {this.props.loading ? (
          <ActivityIndicator {...this.props.loadingProps} />
        ) : (
          this.props.children
        )}
      </TouchableOpacity>
    );
  }
}

export { TouchableDebounce };
