import QtQuick 6.5
import QtQuick.Layouts 6.5
import QtQuick.Controls 6.5
import "../" // parent for colors
import "components" // for LeftBar

Rectangle {
    id: bar
    width: Screen.width
    height: 36
    color: Colors.bgTransparent

    RowLayout {
        anchors.fill: parent
        spacing: 8

        // Left side
        LeftBar { Layout.alignment: Qt.AlignVCenter | Qt.AlignLeft }

        // Center placeholder
        Item {
            Layout.fillWidth: true
            Text { anchors.centerIn: parent; text: "Dynamic Island"; color: Colors.textPrimary }
        }

        // Right placeholder
        RowLayout {
            Layout.alignment: Qt.AlignVCenter | Qt.AlignRight
            Text { text: "CPU: 0%"; color: Colors.textPrimary }
            Text { text: "RAM: 0%"; color: Colors.textPrimary }
        }
    }
}
