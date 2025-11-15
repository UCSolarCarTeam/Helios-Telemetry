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
  compression: {
    compress: true,
    compress_orderby: "timestamp DESC",
    compress_segmentby: "name",
  },
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

  @Column({ type: "text" })
  rfid!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
