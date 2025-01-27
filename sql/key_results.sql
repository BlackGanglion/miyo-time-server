USE miyo_time;

-- 创建关键结果表
CREATE TABLE key_results (
  id INT AUTO_INCREMENT PRIMARY KEY,
  -- 唯一标识关键结果的ID
  result_name VARCHAR(255) NOT NULL,
  -- 关键结果名称
  goal_id INT NOT NULL,
  -- 关联目标的ID
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  -- 记录创建时间
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  -- 记录更新时间
  INDEX idx_goal_id (goal_id) -- 为关联目标ID创建索引
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;