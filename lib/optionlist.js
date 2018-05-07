import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableHighlight,
  ViewPropTypes
} from "react-native";

export default class OptionList extends Component {
  static defaultProps = {
    onSelect: () => {},
    onSizeChange: () => {}
  };
  static propTypes = {
    style: ViewPropTypes.style,
    onSelect: PropTypes.func,
    onSizeChange: PropTypes.func,
    underlayColor: PropTypes.string,
    activeOpacity: PropTypes.number
  };

  render() {
    const { style, children, onSelect, selectedStyle, selected, onSizeChange, bottomIndicator } = this.props;
    const renderedItems = React.Children.map(children, (item, key) => {
      if (!item) return null
      return <TouchableHighlight
        key={key}
        underlayColor={this.props.underlayColor}
        activeOpacity={this.props.activeOpacity}
        style={{ borderWidth: 0 }}
        onPress={() => onSelect(item.props.children, item.props.value)}
      >
        <View
          style={[
            { borderWidth: 0 },
            item.props.value === selected ? selectedStyle : null
          ]}
        >
          {item}
        </View>
      </TouchableHighlight>
      });

    return (
      <View style={[styles.scrollView, style]}>
        <ScrollView
          automaticallyAdjustContentInsets={false}
          bounces={false}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={(contentWidth, contentHeight) => {
            onSizeChange(contentHeight)
          }}
        >
          {bottomIndicator}
          {renderedItems}
        </ScrollView>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  scrollView: {
    height: 120,
    width: 300,
    borderWidth: 1
  }
});
