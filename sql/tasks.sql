USE miyo_time;

-- 创建任务表
CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  -- 唯一标识任务的ID
  task_name VARCHAR(255) NOT NULL,
  -- 任务名称
  task_cron VARCHAR(255) NOT NULL,
  -- 任务周期，使用Cron表达式
  key_result_id INT NOT NULL,
  -- 关联关键结果的ID
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  -- 记录创建时间
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  -- 记录更新时间
  INDEX idx_key_result_id (key_result_id) -- 为关键结果ID创建索引
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;