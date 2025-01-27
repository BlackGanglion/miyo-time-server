USE miyo_time;

-- 创建目标表
CREATE TABLE goals (
  id INT AUTO_INCREMENT PRIMARY KEY,
  -- 唯一标识目标的ID
  goal_name VARCHAR(255) NOT NULL,
  -- 目标名称
  start_time DATETIME NOT NULL,
  -- 目标开始时间
  end_time DATETIME NOT NULL,
  -- 目标结束时间
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  -- 记录创建时间
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- 记录更新时间
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;