import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Hypertable, TimeColumn } from "@timescaledb/typeorm";

@Entity("test_table")
@Hypertable({
  timeColumn: "time",
  chunkInterval: "1 day",
  compress_orderby: "timestamp",
  compression: { compress: true, compress_orderby: "timestamp" },
})
export class TestTable {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @TimeColumn()
  timestamp!: Date;

  @Column({ type: "varchar", length: 255 })
  name!: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ type: "boolean", default: true })
  isActive!: boolean;

  @Column({ type: "int", default: 0 })
  value!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
