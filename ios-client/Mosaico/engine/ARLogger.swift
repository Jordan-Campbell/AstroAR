//
//  ARLogger.swift
//  Mosaico
//
//  Created by Jordan Campbell on 11/10/18.
//  Copyright © 2018 Mosaico. All rights reserved.
//

// This was a fun little library I made that shows log messages in AR, so that you can
// debug AR apps without having to look between the app and XCode.

import ARKit

class ARLogger: SCNNode {
  
  private var logs: [VirtualLabel] = []
  
  override init() {
    super.init()
  }
  
  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
  
  func addLog(message: String) {
    let node = VirtualLabel(theme: "wintermute", text: message)
    self.addChildNode(node.rootNode)
    self.logs.append( node )
    self.layout()
  }
  
  private func layout() {
    // move each log message up by the height of its predecessor
    for index in 1 ..< self.logs.count {
      var height = self.logs[index-1].rootNode.boundingBox.max.y
      self.logs[index].rootNode.position.y = self.logs[index-1].rootNode.position.y + height
    }
  }
  
}
